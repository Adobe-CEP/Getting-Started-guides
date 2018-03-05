import React from 'react';
import styles from './Label.css';

export default ({ label, children, ...rest } = {}) => (
    <label className={styles.field} {...rest}>
        <span className={styles.label}>{label}</span>
        {children}
    </label>
);
