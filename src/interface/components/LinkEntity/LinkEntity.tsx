import React from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import DeletingModalWindow
  from '../DeletingModalWindow/DeletingModalWindow.lazy';
import EditingModalWindow from '../EditingModalWindow/EditingModalWindow.lazy';
import {motion} from 'framer-motion';
import {AiOutlineCaretDown, AiOutlineClose} from 'react-icons/ai';
import ObjectInfo from '../ObjectInfo/ObjectInfo.lazy';
import {MdModeEdit} from 'react-icons/md';
import {removeLink, updateLink} from '../../redux/slicers/linkSlice';

interface LinkEntityProps {
  id: string,
}

/**
 * A component that displays information about a specific
 * link contained in the graph
 * @param {string} id unique link id
 * @constructor
 */
function LinkEntity({id}: LinkEntityProps) {
  const dispatch = useAppDispatch();
  const link = useAppSelector((state) =>
    state.links.items.find((el) => el.id === id),
  );
  const links = useAppSelector((state) => state.links.items);
  const [isShown, setIsShown] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState<string|undefined>(undefined);
  const fields = React.useMemo(
      () => {
        return [
          {
            id: 0,
            title: 'Название',
            fieldId: 'label',
            type: 'text',
            defaultValue: link?.label,
          },
          {
            id: 1,
            title: 'Информация',
            fieldId: 'info',
            type: 'textarea',
            defaultValue: JSON.stringify(link?.value, undefined, 4),
          },
        ];
      },
      [],
  );

  const handleLinkEditing = React.useCallback(
      (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
          label: {value: string},
          info: {value: any}
        };

        try {
          const updatedLink = Object.assign(
              {},
              link,
              {
                label: target.label.value,
                value: JSON.parse(target.info.value),
              },
          );
          dispatch(updateLink(updatedLink));
        } catch (e) {
          setError('Ошибка во время парсинга объекта');
          return;
        }
        setError(undefined);
        setIsEditing(false);
      },
      [links],
  );

  const handleLinkDeleting = React.useCallback(
      () => {
        if (link) {
          dispatch(removeLink(id));
        }
      },
      [links],
  );

  return (
    !link ? (
      <p>Загружаем...</p>
    ) : (
      <>
        {
          isDeleting && (
            <DeletingModalWindow
              content={(
                <p>
                  {`Вы действительно хотите удалить ссылку ${link?.label}?`}
                </p>
              )}
              isOpen={isDeleting}
              setIsOpen={setIsDeleting}
              onDelete={handleLinkDeleting}
            />
          )
        }
        {
          isEditing && (
            <EditingModalWindow
              isOpen={isEditing}
              setIsOpen={setIsEditing}
              content={(
                <div>
                  <p className="text-gray-500 mb-2">
                    {`Объект: Link - ${id}`}
                  </p>
                  <p>
                    Доступные для изменения параметры:
                  </p>
                  <form
                    onSubmit={(event) =>
                      handleLinkEditing(event)
                    }
                    className="flex justify-start items-start flex-col"
                  >
                    {
                      fields.map((field) => (
                        <label
                          key={field.id}
                          htmlFor={field.fieldId}
                          className="ml-3 mt-2 text-md"
                        >
                          <span>{field.title}</span>
                          {
                            field.type === 'textarea' ? (
                              <textarea
                                name={field.fieldId}
                                id={field.fieldId}
                                defaultValue={field.defaultValue}
                                className="w-96 p-1 text-gray-500 h-60"
                              />
                            ) : (
                              <input
                                type={field.type}
                                name={field.fieldId}
                                id={field.fieldId}
                                required
                                defaultValue={field.defaultValue}
                                className="input-field-style"
                              />
                            )
                          }
                        </label>
                      ))
                    }
                    <span className="text-red-500 font-bold">
                      {error}
                    </span>
                    <input type="submit" value="Применить"
                      className="submit-button"/>
                  </form>
                </div>
              )}
            />
          )
        }
        <motion.div
          initial={{
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.5,
            opacity: 0,
          }}
          className="bordered m-1 rounded-md"
          data-testid="NodeEntity"
        >
          <div className="px-2 py-1 flex flex-row justify-between
          items-center">
            {link.label}
            <motion.button
              initial={{
                rotate: 0,
              }}
              animate={{
                rotate: isShown ? 180 : 0,
              }}
              whileTap={{
                scale: 0.9,
              }}
              type="button"
              onClick={() => setIsShown((prevState) => !prevState)}
              className="hover:bg-gray-300 rounded-md p-1"
            >
              <AiOutlineCaretDown/>
            </motion.button>
          </div>
          {
            isShown && (
              <div className="p-2">
                <ObjectInfo obj={link}/>
                <div className="flex flew-row gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="edit-button mt-2"
                  >
                    <MdModeEdit/>
                    Редактировать
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDeleting(true)}
                    className="delete-button mt-2"
                  >
                    <AiOutlineClose/>
                    Удалить
                  </button>
                </div>
              </div>
            )
          }
        </motion.div>
      </>
    )
  );
}

export default LinkEntity;
