import type { SidebarAppSDK } from '@contentful/app-sdk';
import {
  Button,
  EntityList,
  Note,
  Paragraph,
} from '@contentful/f36-components';
import { PlusIcon } from '@contentful/f36-icons';
import { useSDK } from '@contentful/react-apps-toolkit';
import { useEffect, useMemo, useState } from 'react';
import './Sidebar.css';

type Plant = {
  id: string;
  code: string;
};

const CODE_NUMBER_LENGTH = 3;

function generatePaddedNumber(n: number): string {
  return n.toString().padStart(CODE_NUMBER_LENGTH, '0');
}

const Sidebar = () => {
  const sdk = useSDK<SidebarAppSDK>();
  const entry = useMemo(() => sdk.entry, [sdk]);
  const sys = useMemo(() => entry.getSys(), [entry]);
  const [isPublished, setIsPublished] = useState<boolean>(!!sys.publishedAt);
  const genus = useMemo(
    () => (entry.fields.genus.getValue() as string) ?? '',
    [entry],
  );
  const species = useMemo(
    () => (entry.fields.species.getValue() as string) ?? '',
    [entry],
  );
  const [isCreatingPlant, setIsCreatingPlant] = useState<boolean>(false);
  const codeStart = useMemo(
    () => (genus.slice(0, 2) + species.slice(0, 2)).toUpperCase(),
    [genus, species],
  );
  const [plants, setPlants] = useState<Plant[]>([]);
  const cma = sdk.cma;

  useEffect(() => {
    const detach = entry.onSysChanged((sys) =>
      setIsPublished(!!sys.publishedAt),
    );

    return () => detach();
  }, [entry]);

  useEffect(() => {
    sdk.window.startAutoResizer();

    return () => {
      sdk.window.stopAutoResizer();
    };
  }, [sdk]);

  useEffect(() => {
    (async () => {
      const query = {
        content_type: 'plant',
        'fields.commonInfo.sys.id': sys.id,
        order: 'fields.code',
      };

      const plantEntries = await cma.entry.getMany({
        query,
      });

      setPlants(
        plantEntries.items.map((pe) => ({
          id: pe.sys.id,
          code: pe.fields.code.fr,
        })),
      );
    })();
  }, [cma, sys]);

  const getNextPlantCode = async () => {
    const query = {
      content_type: 'plant',
      'fields.code[match]': codeStart,
      order: '-fields.code',
      limit: 1,
    };

    const results = await cma.entry.getMany({
      query,
    });

    if (results.total === 0) {
      return `${codeStart}-${generatePaddedNumber(1)}`;
    }

    const lastPlant = results.items[0];
    const lastNumber = parseInt(lastPlant.fields.code.fr.split('-')[1], 10);
    const nextNumber = generatePaddedNumber(lastNumber + 1);

    return `${codeStart}-${nextNumber}`;
  };

  const createNewPlant = async () => {
    setIsCreatingPlant(true);

    try {
      const nextCode = await getNextPlantCode();

      const newPlant = await cma.entry.create(
        {
          contentTypeId: 'plant',
        },
        {
          fields: {
            commonInfo: {
              fr: {
                sys: {
                  type: 'Link',
                  linkType: 'Entry',
                  id: sys.id,
                },
              },
            },
            code: {
              fr: nextCode,
            },
          },
        },
      );

      await cma.entry.publish(
        {
          entryId: newPlant.sys.id,
        },
        newPlant,
      );

      setPlants([
        ...plants,
        { id: newPlant.sys.id, code: newPlant.fields.code.fr },
      ]);

      sdk.notifier.success(`Plant ${newPlant.fields.code.fr} created!`);
    } catch (_e) {
      sdk.notifier.error(`Could not create a new plant :(`);
    }

    setIsCreatingPlant(false);
  };

  return (
    <div>
      {isPublished ? (
        <div className="plant-sidebar">
          <Button
            isFullWidth={true}
            startIcon={<PlusIcon />}
            variant="positive"
            isLoading={isCreatingPlant}
            isDisabled={isCreatingPlant}
            onClick={() => createNewPlant()}
          >
            {isCreatingPlant ? 'Creating' : 'Create'} new <b>{codeStart}</b>
          </Button>
          {plants.length > 0 ? (
            <>
              <EntityList>
                {plants.map((p) => (
                  <EntityList.Item
                    key={p.id}
                    title={p.code}
                    withThumbnail={false}
                    onClick={() =>
                      sdk.navigator.openEntry(p.id, { slideIn: true })
                    }
                    className="plant-entity-list-item"
                  />
                ))}
              </EntityList>
              <Paragraph>
                {plants.length} plants are linked to this plant card
              </Paragraph>
            </>
          ) : (
            <Paragraph>
              No plants for this entry.
            </Paragraph>
          )}
        </div>
      ) : (
        <Note variant="warning">
          Cannot create a plant until this entry is <b>published</b>
        </Note>
      )}
    </div>
  );
};

export default Sidebar;
