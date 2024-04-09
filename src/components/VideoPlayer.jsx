const VideoPlayer = ({ video }) => {
  return (
    <div>
      <h2>{video.title}</h2>
      <video controls width="100%" height="auto">
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoPlayer
