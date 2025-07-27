import Button from "../Button/Button";

interface ActionsProps {
  isEditMode: boolean;
  onResetData: () => void;
  loading: boolean;
  handleSupplierDelete: () => void;
  onChangeMode: () => void;
}

const Actions: React.FC<ActionsProps> = ({
  handleSupplierDelete,
  isEditMode,
  loading,
  onResetData,
  onChangeMode,
}) => {
  return (
    <span className={"flex gap-2 justify-end pt-6 pb-2"}>
      {isEditMode ? (
        <>
          <Button
            key={"button_Cancel"}
            type="button"
            buttonStyle="secondary"
            handleClick={() => {
              onResetData();
              onChangeMode();
            }}
          >
            Cancelar
          </Button>
          <Button
            key={"button_Save"}
            isLoading={loading}
            type="submit"
            buttonStyle="primary"
          >
            Salvar
          </Button>
        </>
      ) : (
        <>
          <Button
            key={"button_Delete"}
            handleClick={handleSupplierDelete}
            isLoading={loading}
            type="button"
            buttonStyle="secondary"
          >
            Excluir
          </Button>
          <Button
            key={"button_Edit"}
            handleClick={onChangeMode}
            type="button"
            buttonStyle="primary"
          >
            Editar
          </Button>
        </>
      )}
    </span>
  );
};

export default Actions;
