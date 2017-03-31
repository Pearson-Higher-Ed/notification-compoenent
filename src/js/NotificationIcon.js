import React from 'react';
const iconStyles = {
	marginTop: '3px',
	maxHeight: '25px',
	maxWidth: '25px'
};

class NotificationIcon extends React.Component {
	
	render() {
		return (
			<span className={this.props.className}>
				<span className="pe-sr-only">
					{this.props.iconAltText}
				</span>
				<svg
					style={iconStyles}
					version="1.1"
					xmlns="http://www.w3.org/2000/svg" 
					aria-hidden="true"
					focusable="no"
					className={`pe-icon--${this.props.iconName}`}
				>
					<use
						style={{ pointerEvents: 'none' }}
						xlinkHref={`#${this.props.iconName}`}
					/>
				</svg>
			</span>
    	);
	}
}

export default NotificationIcon;
