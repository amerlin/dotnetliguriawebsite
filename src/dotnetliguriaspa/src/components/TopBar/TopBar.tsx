import React, { FC, useState } from 'react';
import styles from './TopBar.module.css';
import LoginControl from "../loginControl";
import { Link } from "react-router-dom";
import { useOidcUser } from "@axa-fr/react-oidc";

interface TopBarProps {
    pageName?: string;
}

const TopBar: FC<TopBarProps> = () => {
    const { oidcUser } = useOidcUser();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [result, setResult] = useState("");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isError, setIsError] = useState(true);

    const loggedOut = () => {
        setResult("");
        setIsError(true);
        localStorage.removeItem("profileStore");
    }

    return (
        <div className={styles.TopBar}>
            <div className={styles.TopBarWrapper}>
                <div className="topLeft">
                    <div className={styles.logo}>
                        <Link to={"/"}>
                            DotNet Liguria
                        </Link>
                    </div>
                </div>
                <div className={styles.TopRight}>
                    {/*<div className={styles.TopIconContainer}>*/}
                    {/*    <Notifications/>*/}
                    {/*    <div className={styles.TopIconBadge}>*/}
                    {/*        5*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={styles.TopIconContainer}>*/}
                    {/*    <Language/>*/}
                    {/*    <div className={styles.TopIconBadge}>*/}
                    {/*        5*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={styles.TopIconContainer}>*/}
                    {/*    <SettingsIcon/>*/}
                    {/*</div>*/}
                    <div>
                        <LoginControl onLogout={loggedOut} />
                    </div>
                    <img src={oidcUser?.picture}
                        alt="Profile" className={styles.TopAvatar} />
                </div>
            </div>
        </div>
    );
}
export default TopBar;
