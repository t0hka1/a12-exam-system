import { faceService } from "utils/request";

// 解析facetoken
export function getFaceToken() {
  return faceService({
    url: `/facepp/v3/detect`,
    method: 'POST',
  })
}

