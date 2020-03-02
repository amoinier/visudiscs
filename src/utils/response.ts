const response = (req: any, res: any) => {
  const { status = 200, message = '', datas = {} } = res && res.resp ? res.resp : {}

  res.status(status)
  return res.json({
    message,
    datas
  })
}

export interface ResponseResp<ResBody = any> extends Response {
  resp?: {
    datas?: any
  }
}

export default response