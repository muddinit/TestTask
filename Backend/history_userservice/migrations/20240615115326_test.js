/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('user_action_history', function (table) {
    table.uuid('id').primary();
    table.uuid('user_id').notNullable();
    table.string('action_type').notNullable();
    table.timestamp('action_date').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('user_action_history');
};
