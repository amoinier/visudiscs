module.exports = (req, res) => {
  const { status = 200, message = '', datas = {} } = res && res.resp ? res.resp : {}

  res.status(status)
  return res.json({
    message,
    datas
  })
}
