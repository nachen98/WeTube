import "./Footer.css";

function Footer() {

    return (
        <>

            <div className="footer-container flx-row-space-btw">

                <div className="wetube-designer">
                    WeTube is designed by Na Chen
                </div>
                <div className="credential-links flx-row">
                    <div id="github-link">
                        <a
                            href="https://github.com/nachen98"
                            target="_blank"
                        >
                            {/* <button class="fa-brands fa-github"></button> */}
                        GitHub
                        </a>
                    </div>

                    <div id="linkedin-link" >
                    <a
                            href="https://www.linkedin.com/in/na-chen-pharmd2019/"
                            target="_blank"
                        >
                    
            
                            {/* <button class="fa-brands fa-linkedin"></button> */}
                        Linkedin
                        </a>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer;