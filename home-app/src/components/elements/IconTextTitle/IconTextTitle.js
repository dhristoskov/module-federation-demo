import BaseIcon from '../BaseIcon/BaseIcon'
import Typography from '../Typography/Typography'

const IconTextTitle = ({ icon, text }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <BaseIcon
        icon={icon}
        size="2xl"
      />
      <Typography
        tag="h3"
        additionalClasses="text-slate-900 text-2xl font-bold"
      >
        {text}
      </Typography>
    </div>
  )
}

export default IconTextTitle
