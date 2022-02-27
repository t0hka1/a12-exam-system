import { faceService } from "utils/request";

// 解析facetoken
export function getFaceToken(data) {
  return faceService({
    url: '/detect',
    method: 'POST',
    data
  })
}

