import { LinkedIn, GitHub, Summarize, Email } from "@mui/icons-material"


const AppFooter = () => {
    return (
        <div className="footer">
            <div className="social-media">
                <a href="https://www.linkedin.com/in/toddlgarrison/" target="_blank" rel="noopener noreferrer">
                    <LinkedIn />
                </a>

                <a href="https://github.com/ToddLGarrison" target="_blank" rel="noopener noreferrer">
                    <GitHub />
                </a>

                <a href="https://drive.google.com/file/d/10K4RwnvrrxBgd0mdIarZu_OZRVkTuh1k/view?usp=sharing"  target="_blank" rel="noopener noreferrer">
                    <Summarize />
                </a>

                <a href="mailto:toddlgarrison@gmail.com">
                    <Email />
                </a>
            </div>
            <p>All materials &copy; Todd Garrison 2023</p>
        </div>
    )
}

export default AppFooter