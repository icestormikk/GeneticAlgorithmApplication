import React from 'react';
import {ReduxLinkObject} from '../redux/extensions/ReduxLinkObject';
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineClose,
  AiOutlineEdit,
} from 'react-icons/ai';
import ObjectInfo from './ObjectInfo';
import ChangeEntity from './ChangeEntity';
import {useAppDispatch} from '../redux/hooks';
import {removeLink, updateLink} from '../redux/slicers/linkSlice';
import {GoSettings} from 'react-icons/go';
import CustomModal from './CustomModal';

interface LinkPanelProps {
  link: ReduxLinkObject,
  isActionsShown?: boolean
}

/**
 * Link Panel
 * @param {ReduxLinkObject} link
 * @param {boolean} isActionsShown
 * @constructor
 */
function LinkPanel({link, isActionsShown = false}: LinkPanelProps) {
  const dispatch = useAppDispatch();
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isValueEditing, setIsValueEditing] = React.useState(false);
  const [linkValue, setLinkValue] = React.useState(link.value);
  const [
    valueEditingError,
    setValueEditingError,
  ] = React.useState<string|null>(null);

  const handleLinkDeleting = React.useCallback(() => {
    dispatch(removeLink(link.id));
  }, [link]);

  const handleLinkEditing = React.useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      label: {value: string}
    };

    try {
      const obj = JSON.parse(JSON.stringify(link)) as ReduxLinkObject;
      obj.label = target.label.value;
      obj.value = linkValue;
      dispatch(updateLink(obj));
      setIsEditing(false);
    } catch (e) {
      console.log(e);
    }
  }, [link, linkValue]);

  const handleValueEditing = React.useCallback((event:React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      obj: {value: string}
    };

    try {
      const result = JSON.parse(target.obj.value);
      setLinkValue(result);
      setIsValueEditing(false);
    } catch (e: any) {
      setValueEditingError(`Ошибка во время конвертации: ${e.message}`);
    }
  }, []);

  React.useEffect(() => {
    setValueEditingError(null);
  }, [isValueEditing]);

  return (
    link ? (
      <div className="flex flex-col justify-start items-center">
        {
          isValueEditing && (
            <CustomModal
              content={(
                <form
                  onSubmit={(event) => handleValueEditing(event)}
                  className="max-w-[40rem] w-full h-full"
                >
                  <textarea
                    name="obj"
                    id="obj"
                    className="bordered rounded-md shadow-md p-1 font-light
                    resize-y h-[32rem] max-h-[32rem] font-[Arial] w-full"
                    defaultValue={
                      JSON.stringify(link.value, undefined, 2)
                    }
                  />
                  {
                    valueEditingError && (
                      <span className="text-red-500 text-sm">
                        {valueEditingError}
                      </span>
                    )
                  }
                  <button type="submit" className="edit-entity-button">
                    Проверить
                  </button>
                </form>
              )}
              isOpen={isValueEditing}
              setIsOpen={setIsValueEditing}
            />
          )
        }
        <div className="flex flex-row justify-between items-center w-full">
          <span>{link.label}</span>
          {
            isActionsShown && (
              <button
                type="button"
                onClick={() => setIsCollapsed((prevState) => !prevState)}
                className="show-more-node-button"
              >
                {isCollapsed ? <AiFillCaretDown/> : <AiFillCaretUp/>}
              </button>
            )
          }
        </div>
        {
          !isCollapsed && (
            <div className="flex flex-col p-1 h-min w-full gap-0.5 border-[1px]
            rounded-md">
              {
                !isEditing ? (
                  <>
                    <h1>Информация:</h1>
                    <ObjectInfo obj={link}/>
                    <div className="flex justify-start items-center gap-2">
                      <button
                        type="button"
                        title="Удалить связь"
                        onClick={() => handleLinkDeleting()}
                        className="delete-entity-button"
                      >
                        <AiOutlineClose/>
                        <span>Удалить связь</span>
                      </button>
                      <button
                        type="button"
                        title="Редактировать связь"
                        onClick={() => setIsEditing(true)}
                        className="edit-entity-button"
                      >
                        <AiOutlineEdit/>
                        <span>Редактировать</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <ChangeEntity
                    fields={[
                      <label htmlFor="label">
                        Название (label):
                        <input type="text" name="label" id="label"
                          defaultValue={link.label} required/>
                      </label>,
                      <button
                        type="button"
                        onClick={() => setIsValueEditing(true)}
                        className="centered flex-row gap-2 rounded-md px-2
                        py-0.5 text-white bg-gray-500"
                      >
                        <GoSettings/>
                        <span>Изменить содержимое</span>
                      </button>,
                    ]}
                    onSubmit={handleLinkEditing}
                    onClose={() => setIsEditing(false)}
                  />
                )
              }
            </div>
          )
        }
      </div>
    ) : (
      <span>ССЫЛКА НЕ НАЙДЕНА</span>
    )
  );
}

export default LinkPanel;
