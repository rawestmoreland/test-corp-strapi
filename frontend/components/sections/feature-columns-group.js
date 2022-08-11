import NextImage from "../elements/image"

const FeatureColumnsGroup = ({ data }) => {
  //console.log("data object passed in: ", data)
  //console.log("data.features: ", data.features)
  //console.log("data.features[0].id: ", data.features[0].feature.id)
  //console.log("data.features[0].icon: ", data.features[0].feature.icon)

  // These were located right before the NextImage in the JSX below currently on line 34
  // {console.log('Inside FeatureColumnsGroup and the feature.icon.data.id is:', feature.icon.data.id)}
  // {console.log('feature.icon.data.attributes.height is:', feature.icon.data.attributes.height)}
  // {console.log('feature.icon.data.attributes.width is:', feature.icon.data.attributes.width)}
  // {console.log(' feature.icon.data is:', feature.icon.data)}

  const featureAlignment = (alignment) => {
    switch (alignment) {
      case 'center':
        return 'items-center'
      case 'left':
        return ''
      case 'right':
        return 'items-end'
      default:
        return ''
    }
  }

  return (
    <div className="container flex flex-col lg:flex-row lg:flex-wrap gap-12 align-top py-12">
      {data.features.map((feature) => {
        feature.alignment = 'center';
        return <div className={`flex flex-col flex-1 text-lg ${featureAlignment(feature.alignment)}`} key={feature.id}>
          <div className="w-10 h-10 md:w-20 md:h-20">
            <NextImage media={feature.icon} />
          </div>
          <h3 className="font-bold mt-4 mb-4">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      })}
    </div>
  )
}

export default FeatureColumnsGroup
