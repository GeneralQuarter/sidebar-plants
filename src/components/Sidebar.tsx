import React, { useEffect, useState } from 'react';
import { Button, EntityList, EntityListItem, Note, Paragraph } from '@contentful/forma-36-react-components';
import { SidebarExtensionSDK } from '@contentful/app-sdk';
import './Sidebar.css';

interface SidebarProps {
  sdk: SidebarExtensionSDK;
}

const Sidebar = ({sdk}: SidebarProps) => {
  const entry = sdk.entry;
  const sys = entry.getSys();
  const isPublised = !!sys.publishedAt;
  const genus = entry.fields['genus'].getValue() as string ?? '';
  const species = entry.fields['species'].getValue() as string ?? '';
  const [isCreatingPlant, setIsCreatingPlant] = useState(false);
  const codeStart = (genus.slice(0, 2) + species.slice(0, 2)).toUpperCase();
  const [plants, setPlants] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const searchQuery = {
        content_type: 'plant',
        'fields.commonInfo.sys.id': sys.id,
        order: 'fields.code'
      }
  
      const plantEntries = await sdk.space.getEntries(searchQuery);

      setPlants(plantEntries.items.map((pe: any) => ({
        id: pe.sys.id,
        code: pe.fields.code.fr
      })));
    })()
  }, [sdk, sys]);

  const getNextPlantCode = async () => {
    const searchQuery = {
      content_type: 'plant',
      'fields.code[match]': codeStart,
      order: '-fields.code',
      limit: 1
    }

    const results = await sdk.space.getEntries(searchQuery);

    if (results.total === 0) {
      return `${codeStart}-01`;
    }

    const lastPlant: any = results.items[0];
    const lastNumber = parseInt(lastPlant.fields.code.fr.split('-')[1]);
    const nextNumber = lastNumber + 1;
    const nextNumberPadded = nextNumber < 10 ? `0${nextNumber}` : nextNumber;

    return `${codeStart}-${nextNumberPadded}`
  }

  const createNewPlant = async () => {
    setIsCreatingPlant(true);

    try {
      const nextCode = await getNextPlantCode();

      const newPlant: any = await sdk.space.createEntry('plant', {
        fields: {
          commonInfo: {
            fr: {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: sys.id
              }
            }
          },
          code: {
            fr: nextCode
          }
        }
      });

      await sdk.space.publishEntry(newPlant);

      setPlants([...plants, {id: newPlant.sys.id, code: newPlant.fields.code.fr}]);

      sdk.notifier.success(`Plant ${newPlant.fields.code.fr} created!`);
    } catch (e) {
      sdk.notifier.error(`Could not create a new plant :(`);
    }

    setIsCreatingPlant(false);
  }

  return <div>
    {isPublised ? 
      <>
        <Button isFullWidth={true} 
          icon="Plus" 
          buttonType="positive" 
          loading={isCreatingPlant} 
          disabled={isCreatingPlant}
          onClick={() => createNewPlant()}
        >{isCreatingPlant ? 'Creating' : 'Create'} new <b>{codeStart}</b></Button>
        {plants.length > 0 ? 
          <EntityList className="plant-entity-list">
            {plants.map(p => (
              <EntityListItem key={p.id} 
                title={p.code} 
                onClick={() => sdk.navigator.openEntry(p.id, {slideIn: true})}
                className="plant-entity-list-item"
              />
            ))}
          </EntityList>
          : <Paragraph className="plant-entity-list-empty">No plants for this entry.</Paragraph>
        }
      </> : <Note noteType="warning">Cannot create a plant until this entry is <b>published</b></Note>
    }
  </div>;
};

export default Sidebar;
