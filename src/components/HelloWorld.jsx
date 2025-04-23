import PropTypes from 'prop-types';

const HelloWorld = (props) => {
    return <>
        <p>&quot;Hello, World!&quot;</p>
        <p>User: {props.user}</p>
    </>
}

// Proptypes is deprecated and no longer works as of React 19. In the future, change to an alternative solution (Recommendation: Typescript)
HelloWorld.propTypes = {
    user: PropTypes.string,
};
HelloWorld.defaultProps = {
    user: "Zach",
};
export default HelloWorld;