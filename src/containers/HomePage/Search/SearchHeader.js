import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./SearchHeader.scss"
class SearchHeader extends Component {

    render() {
        return (
            <>
             <div className="home-header-search">
                    <div className="header-search-text">
                        <p>Nơi khởi nguồn sức khỏe</p>
                    </div>
                    <div className="search-form"  >
                        <div class="s009">
                            <form>
                                <div class="inner-form">
                                    <div class="basic-search">
                                        <div class="input-field">
                                            <input
                                                id="search"
                                                type="text"
                                                placeholder="Đặt Câu Hỏi Với Trợ Lý AI"
                                            />
                                            <div class="icon-wrap">
                                                <svg
                                                    class="svg-inline--fa fa-search fa-w-16"
                                                    fill="#ccc"
                                                    aria-hidden="true"
                                                    data-prefix="fas"
                                                    data-icon="search"
                                                    role="img"
                                                    viewBox="0 0 512 512"
                                                >
                                                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchHeader);
