const CustomFeedback = (props) => (
    props.children ?
        <span className={` d-block ${props.className}`}>
            {props.children}
        </span>
        : <></>
)

export { CustomFeedback };