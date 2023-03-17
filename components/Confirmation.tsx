const ConfirmationDialog = ({
    confirmRemoveRecipe,
    cancelRemoveRecipe,
  }: {
    confirmRemoveRecipe: () => void;
    cancelRemoveRecipe: () => void;
  }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="mb-4">Are you sure you want to remove this recipe?</p>
        <div className="flex justify-center">
          <button
            onClick={confirmRemoveRecipe}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 mr-2"
          >
            Yes
          </button>
          <button
            onClick={cancelRemoveRecipe}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            No
          </button>
        </div>
      </div>
    );
  };

  export default ConfirmationDialog;