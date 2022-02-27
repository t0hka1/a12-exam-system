import { faceService } from "utils/request";

// 解析facetoken
export function saveFaceInfo (data) {
  return faceService({
    url: `/facepp/v3/detect`,
    method: 'POST',
    params: {
      api_key: 'kyI1fEFtdNyAMVbJiCCh6s3JwUvBTo19',
      api_secret: 'RebXttV4Lw3tQ4cO8DhHudr8f_Q2kEVb',
    },
    data
  })
}

