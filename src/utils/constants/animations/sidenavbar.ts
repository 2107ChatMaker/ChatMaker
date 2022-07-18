//variables for sidebar animation
const animation = {
    visible: i => ({
        width: "17rem",
        height: "100%",
        transition: {
            duration: 0.5,
            delay: 0.3
        },
    }),
    hidden: {
        height: "100%",
        width: "4.5rem",
        transition: {
            duration: 0.5,
        }
    },
};

export default animation;