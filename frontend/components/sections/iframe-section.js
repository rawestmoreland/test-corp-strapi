//import PropTypes from "prop-types"
import React from "react"

const IframeSection = ({ data }) => {
   // console.log("<<<*>>> data is: ", data);
   // console.log("<<<*>>> data.embedIframe is: ", data.embedIframe);

  return (
    <iframe src={`${data.embedIframe.src}` } height={`${data.embedIframe.height}`} width={`${data.embedIframe.width}`} className="container prose prose-lg max-w-none text-center py-12"/>     
    
  )
}

// https://help.viostream.com/frequently-asked-questions/how-do-i-make-an-iframe-embed-responsive/
// A responsive iframe will render well across a variety of devices and screen sizes.
// In order to make your embedded iframe responsive, you need to wrap the iframe in a div and apply inline css. Follow these simple steps:

// Get the iframe embed code and paste in into your HTML page.
// Set the height and the width attributes of the iframe tag to 100%
// Change the CSS position of the iframe tag to ‘absolute’ and set the left and top CSS parameters to ‘0’
// Add a div container around the iframe tag as it is shown by the following sample code. The value of the ‘padding-bottom’ parameter is based on the aspect ratio of the content (in case of a 16:9 video the calculation is 9/16 = 0.5625)
// Your final html code should look similar to the below:

// <div style="padding-bottom:56.25%; position:relative; display:block; width: 100%">
//   <iframe width="100%" height="100%"
//     src="https://play.viostream.com/iframe/s0m3m3d14?playerKey=s0m3p14y3r"
//     frameborder="0" allowfullscreen="" style="position:absolute; top:0; left: 0">
//   </iframe>
// </div>

// RichText.propTypes = {
//   data: PropTypes.shape({
//     content: PropTypes.string,
//   }),
// }

export default IframeSection
