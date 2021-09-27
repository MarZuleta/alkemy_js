'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Transactions', 'amount', {
        type: Sequelize.FLOAT,
        allowNull: false
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Transactions', 'amount', {
      type: Sequelize.INTEGER
    })
  }
};
