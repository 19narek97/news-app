import React from "react";
import classes from "./SourcesAndCategory.module.css"
import Card from "../../Componenets/Card/Card";
import Request from "../../utils/request";
import Pagination from "react-js-pagination";
import Loader from "../../Componenets/Loader/Loader";
import Modal from "../../Componenets/Modal/Modal";

const initialState = {
    page: 1,
    header: null,
    isLoading: false,
    pageSize: "10",
}

class SourcesAndCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
            entry: {},
            filterText: null,
            data: {status: "", totalResults: 0, articles: []},
            unfilteredData: []
        }
    }

    getArticlesBySource = (id, clickedPage) => {
        let {pageSize, page} = this.state,
            queryParam = `${clickedPage}=${id}`;

        this.setState({
            isLoading: true
        }, () => Request('get', {Accept: 'application/json'}, `${queryParam}&pageSize=${pageSize}&page=${page}`, clickedPage).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                const error = new Error(`HTTP Error ${response.statusText}`);
                error.status = response.statusText;
                error.response = response;
                throw error;
            }
        }).then((data) => {
            let header = data.articles.length > 0 ? data.articles[0].source.name : null;
            this.setState({
                header,
                isLoading: false,
                data
            })
        }))
    }

    componentDidMount() {
        this.setState({
            ...initialState
        }, () => this.getArticlesBySource(this.props.match.params.id, this.props.match.params.page))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                ...initialState
            }, () => this.getArticlesBySource(this.props.match.params.id, this.props.match.params.page))
        }
    }

    handelChangePageSize = (e) => {
        let pageSize = e.target.value;
        this.setState({
            pageSize
        }, () => this.getArticlesBySource(this.props.match.params.id, this.props.match.params.page))
    }

    handlePageChange = (page) => {
        this.setState({
            page
        }, () => this.getArticlesBySource(this.props.match.params.id, this.props.match.params.page))
    }

    renderCards = (data, totalResults) => {

        if (totalResults > 0) {
            return data.map((el, index) => (
                <div key={index} className="col-sm-3 mt-5">
                    <Card article={el} onOpenModal={this.openModal}/>
                </div>
            ))
        } else {
            return (
                <>
                    <div className="col-sm-4"/>
                    <div className="col-sm-4">
                        <div style={{margin: "0 auto"}}
                             className="height--1-1 l-flex--col l-flexer soft-quad--sides soft-double--top">
                            <div
                                className="height--1-1 flex flex--column flex-justified--center text--center soft-quad push-quad--top">
                                <img src="https://app.optimizely.com/static/img/p13n/page-list-empty-state.svg"
                                     className="anchor--middle push--ends" alt="zxc" width="450"/>
                                <h1 className="push-half--bottom">Sorry but there is no news</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4"/>
                </>
            )
        }

    }

    openModal = (entry) => {
        this.setState({
            entry
        }, () => this.setState({isModalOpen: true}))

    }

    closeModal = () => {
        this.setState({isModalOpen: false})
    }

    onChangeSearch = (e) => {
        this.setState({
            filterText: e.target.value
        }, () => this.filterData())
    }

    setUnfilteredData = (data) => {
        if (!this.state.unfilteredData.length > 0) {
            const copy = Object.assign([], data);
            this.setState({unfilteredData: copy});
        }
    }

    filterData = () => {
        let {data, unfilteredData, filterText} = this.state;
        this.setState({
            isLoading: true
        })
        this.setUnfilteredData(data.articles)

        function matchesText(item) {
            return item.title ? item.title.toLowerCase().includes(filterText.toLowerCase()) : false;
        }

        let dataToFilter = unfilteredData ? unfilteredData : data.articles
        let filteredData = dataToFilter
            .filter(matchesText);

        this.setState((prevstate) => {
            return {
                data: {
                    status: prevstate.data.status,
                    totalResults: prevstate.data.totalResults,
                    articles: [...filteredData]
                },
                isLoading: false
            }
        })
    }

    render() {
        let {data, isLoading, header, pageSize, page, isModalOpen, entry} = this.state;

        return (
            <>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => this.closeModal()}
                    entry={entry}
                />
                <div style={{justifyContent: "center"}} className="row">
                    <h1 align="center" className={`${classes["title"]} mt-2`}>{header} Articles </h1>
                </div>
                <div className="row">
                    <div className="col-sm-2 ml-4">
                        <input type="text" onChange={this.onChangeSearch} placeholder="Search By Title"
                               className="mt-1 form-control" aria-label="Text input with dropdown button"/>
                    </div>
                    <div className="col-sm-6"/>
                    <div className="col-sm-3">
                        <div className="col-auto my-1 float-right">
                            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Change Page Size</label>
                            <select onChange={this.handelChangePageSize} className="custom-select mr-sm-2 "
                                    id="inlineFormCustomSelect">
                                <option value="10">10</option>
                                <option value="20">15</option>
                                <option value="25">25</option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr/>
                {
                    isLoading ? <Loader/> : <>
                        <div className="row">
                            {this.renderCards(data.articles, data.totalResults)}
                        </div>
                        <div style={{justifyContent: "center", marginTop: "50px"}} className="row">
                            {
                                data.totalResults > 0 ? <Pagination
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activePage={page}
                                    itemsCountPerPage={+pageSize}
                                    totalItemsCount={100}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange}
                                /> : null
                            }
                        </div>
                    </>
                }

            </>

        )
    }
}

export default SourcesAndCategory