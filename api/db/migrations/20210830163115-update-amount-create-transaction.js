'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Transactions', 'amount', {
        type: Sequelize.FLOAT,
        allowNull: false
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('Transactions', 'amount')]);
  }
};
