let session = null

const getSentence = () => {

}

// 需要实现引入ifly文件哦
const getSession = (callbacks) => {
  if (session) {
    return session
  }
  return session = new IFlyIatSession({'callback': callbacks})
}

export default {
  getSentence,
  getSession,
}
