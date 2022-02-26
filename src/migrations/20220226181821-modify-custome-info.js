'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('customer_infos', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('customer_infos', 'email');
  }
};
