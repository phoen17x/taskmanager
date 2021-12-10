const pg = require('../db/index')
const asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await pg.query('SELECT * FROM tasks')
  res.status(200).json(tasks.rows)
})

const createTask = asyncWrapper(async (req, res) => {
  const { task_name } = req.body
  const task = await pg.query(
    'INSERT INTO tasks (task_uid, task_name) VALUES (uuid_generate_v4(), $1) RETURNING *',
    [task_name]
  )
  res.status(201).json(task)
})
const getTask = asyncWrapper(async (req, res, next) => {
  const task_id = req.params.id
  const task = await pg.query('SELECT * FROM tasks WHERE task_uid = $1', [
    task_id,
  ])
  res.status(200).json(task.rows[0])
})

const updateTask = asyncWrapper(async (req, res) => {
  const { task_name, completed } = req.body
  const task_id = req.params.id
  if (task_name) {
    await pg.query('UPDATE tasks SET task_name = $1 WHERE task_uid = $2', [
      task_name,
      task_id,
    ])
  }
  const task = await pg.query(
    'UPDATE tasks SET completed = $1 WHERE task_uid = $2 RETURNING *',
    [completed, task_id]
  )
  res.status(200).json(task.rows[0])
})

const deleteTask = asyncWrapper(async (req, res) => {
  const task_id = req.params.id
  await pg.query('DELETE FROM tasks WHERE task_uid = $1', [task_id])
  res.status(200).json('deleted')
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
