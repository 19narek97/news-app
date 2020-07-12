import React from "react";
import classes from "./UserLayout.module.css"
import {Link} from "react-router-dom"
import ContactUsModal from "../ContactUsModal/ContactUsModal";


class UserLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sources: [],
            openModal: false,
            errorMsg: null,
            name: "",
            email: "",
            message: "",
            category: [
                {
                    url: "business",
                    name: "Business"
                },
                {
                    url: "entertainment",
                    name: "Entertainment"
                },
                {
                    url: "general",
                    name: "General"
                },
                {
                    url: "health",
                    name: "Health"
                },
                {
                    url: "science",
                    name: "Science"
                },
                {
                    url: "sports",
                    name: "Sports"
                },
                {
                    url: "technology",
                    name: "Technology"
                },
            ]
        }
    }

    componentDidMount() {
        fetch("https://newsapi.org/v2/sources?apiKey=6eff99d7b47d47c79cd7203ebb74a74b", {
            method: 'get',
            headers: {
                Accept: 'application/json',
            },
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                const error = new Error(`HTTP Error ${response.statusText}`);
                error.status = response.statusText;
                error.response = response;
                throw error;
            }
        }).then((data) => {
            let news = data.sources,
                randomNewsNameAndId = [];
            for (let i = 0; i < 5; i++) {
                let show = news[Math.floor(Math.random() * news.length)];
                randomNewsNameAndId.push({id: show["id"], name: show["name"]})
            }

            this.setState({
                sources: [...randomNewsNameAndId]
            })

        })
    }

    openMenu = () => {
        if (this.navbarMenu.style.display === 'flex') {
            this.navbarMenu.style.display = 'none'
            return
        }
        this.navbarMenu.style.display = 'flex'
    }

    handelChange = (e) => {
        let inputName = e.target.id,
            value = e.target.value,
            updateState = {};
        updateState[inputName] = value;
        this.setState({...updateState}, () => console.log(this.state))
    }

    sendContactUs = () => {
        const {email, name, message} = this.state;
        let messageText = "";
        if (name.trim().length === 0 || email.trim().length === 0 || message.trim().length === 0) {
            messageText = "Input Field(s) is empty."
        } else if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            messageText = " Email is Not Valid";
        }

        if (messageText.trim().length === 0) {
            this.setState({
                errorMsg: null,
                openModal: false
            })
        } else {
            this.setState({
                errorMsg: messageText
            })
        }
    }

    onModalClose = () => {
        this.setState({
            openModal: false
        })
    }

    onOpenModal = () => {
        this.setState({
            openModal: true
        })
    }


    render() {
        const {children} = this.props;
        let {sources, category, openModal, errorMsg} = this.state,
            subMenu = sources.map((el) => (
                <span key={el.id}>
                    <li className={classes["separator"]}/>
                    <li><Link to={`/sources/${el.id}`}>{el.name}</Link></li>
                </span>
            )),
            categoryes = category.map((el) => (
                <span key={Math.random()}>
                    <li className={classes["separator"]}/>
                    <li><Link to={`/category/${el.url}`}>{el.name}</Link></li>
                </span>
            ));
        return (
            <>
                <ContactUsModal errorMsg={errorMsg} sendContactUs={this.sendContactUs} onClose={this.onModalClose}
                                handelChange={this.handelChange} isOpen={openModal}/>
                <nav className={classes["navbar"]}>
                    <div className={classes["container"]}>
                        <div className={classes["navbar-header"]}>
                            <button onClick={this.openMenu} className={classes["navbar-toggler"]}>
                                <span/>
                                <span/>
                                <span/>
                            </button>
                            <Link to="/">
                                <h4>Ne<span>ws</span></h4>
                            </Link>
                        </div>

                        <div className={classes["navbar-menu"]} ref={(ref) => this.navbarMenu = ref}
                             id={classes["open-navbar1"]}>
                            <ul className={classes["navbar-nav"]}>
                                <li><Link to="/">Home</Link></li>
                                <li className={classes["navbar-dropdown"]}>
                                    <Link className={classes["dropdown-toggler"]}>
                                        Sources <i className="fa fa-angle-down"/>
                                    </Link>
                                    <ul className={classes["dropdown"]} id={classes["my-dropdown-id"]}>
                                        {subMenu}
                                    </ul>
                                </li>

                                <li className={classes["navbar-dropdown"]}>
                                    <Link className={classes["dropdown-toggler"]}>
                                        Category <i className="fa fa-angle-down"/>
                                    </Link>
                                    <ul className={classes["dropdown"]} id={classes["my-dropdown-id"]}>
                                        {categoryes}
                                    </ul>
                                </li>

                                <li>

                                </li>
                                <li>
                                    <button onClick={this.onOpenModal} type="button"
                                            className="btn btn-primary ml-4">ContactUs
                                    </button>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
                <main>
                    {children}
                </main>
            </>

        )
    }
}

export default UserLayout;