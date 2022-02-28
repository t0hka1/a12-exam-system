import { faceService } from "utils/request";

// 传图片解析faceinfo
export function detectFaceInfo (data) {
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

//以学号标识FaceSet
export function createFaceSet (outer_id, face_tokens) {
  return faceService({
    url: `/facepp/v3/faceset/create`,
    method: 'POST',
    params: {
      api_key: 'kyI1fEFtdNyAMVbJiCCh6s3JwUvBTo19',
      api_secret: 'RebXttV4Lw3tQ4cO8DhHudr8f_Q2kEVb',
      outer_id,
      face_tokens,
      force_merge: 1
    },
  })
}
