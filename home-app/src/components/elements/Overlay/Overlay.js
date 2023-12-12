const Overlay = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed z-10 inset-0 bg-gray-300 bg-opacity-60 transition-opacity"
    />
  )
}

export default Overlay
