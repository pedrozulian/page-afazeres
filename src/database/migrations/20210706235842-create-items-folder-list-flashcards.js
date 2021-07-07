'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items_folder_list_flashcards', {
      id_folder: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'folder_list_flashcards', key: 'id' }
      },
      id_list: {
        type: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: 'list_flashcards', key: 'id' }
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items_folder_list_flashcards');
  }
};