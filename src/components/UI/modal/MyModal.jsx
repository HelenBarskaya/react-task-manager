import React from 'react';
import classes from "./MyModal.module.css";

const MyModal = ({children, visible, setVisible, chart}) => {

    const rootClasses = [classes.myModal]
    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => {
            setVisible(false)

            if (chart != null) {
                chart.destroy()
            }
        }}>
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;