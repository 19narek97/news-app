import React from "react";
import Request from "../../utils/request";
import Card from "../../Componenets/Card/Card";
import Modal from "../../Componenets/Modal/Modal";
import Loader from "../../Componenets/Loader/Loader";

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            entry: {},
            country: "ru",
            isModalOpen: false,
            data: {status: "", totalResults: 0, articles: []}
        }

    }

    getArticlesBySource = () => {
        let {country} = this.state;
        this.setState({
            isLoading: true
        }, () => Request('get', {Accept: 'application/json'}, `country=${country}`, null).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                const error = new Error(`HTTP Error ${response.statusText}`);
                error.status = response.statusText;
                error.response = response;
                throw error;
            }
        }).then((data) => {
            this.setState({
                isLoading: false,
                data
            })
        }))
    }

    componentDidMount() {
        this.getArticlesBySource()
    }

    openModal = (entry) => {
        this.setState({
            entry
        }, () => this.setState({isModalOpen: true}))

    }

    closeModal = () => {
        this.setState({isModalOpen: false})
    }

    renderCards = (data) => {

        return data.map((el, index) => (
            <div key={index} className="col-sm-3 mt-5">
                <Card article={el} onOpenModal={this.openModal}/>
            </div>
        ))

    }

    handelChangeCountry = (e) => {
        this.setState({
            country: e.target.value
        }, () => this.getArticlesBySource())
    }

    render() {
        const {data, isLoading, isModalOpen, entry} = this.state;
        return (
            <>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => this.closeModal()}
                    entry={entry}
                />
                <h1 align="center" className="mt-3"> Top News</h1>
                <div className="row">
                    <div className="col-sm-9"/>
                    <div className="col-sm-3">
                        <div className="col-auto my-1 float-right">
                            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Change Country:</label>
                            <select onChange={this.handelChangeCountry} className="custom-select mr-sm-2 "
                                    id="inlineFormCustomSelect">
                                <option value="ru">Ru</option>
                                <option value="us">Us</option>
                                <option value="gb">Gb</option>
                                <option value="at">At</option>
                                <option value="ve">Ve</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        isLoading ? <Loader/> : this.renderCards(data.articles)
                    }
                </div>
            </>
        )
    }
}

export default Home;