import { Transaction } from 'sequelize'

import sequelize from './sequelize'

/*
  Used for functions that take optional parameter transaction: Transaction.
  If param transaction is not passed, create a new transaction.
 */
export const runWithTransaction = (
  dbLogic: (transaction: Transaction) => Promise<unknown>,
  transaction?: Transaction
): Promise<unknown> => {
  if (transaction) {
    return dbLogic(transaction)
  }

  return sequelize.transaction((innerTransaction) => dbLogic(innerTransaction))
}
