import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Section.scss'
import { FormattedMessage } from "react-intl";
class SocialMedia extends Component {


    render() {
        return (
            <div className='section-background-social'>
                <div className='container'>
                    <div className='section-social'>
                        <div className='section-content'>
                            <p className='section-text'><FormattedMessage id="home-page.social-media" /></p>
                        </div>
                        <div className='section-body'>
                            <div className="social-left">

                                <iframe width="560" height="315" src="https://www.youtube.com/embed/FyDQljKtWnI?si=LOc5M6G-9pBwcDv7" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </div>
                            <div className="social-right">
                                {/* <div className='media-left'>
                                    <img src='/images/vnexpress.png' className='slider-img'></img>
                                </div> */}
                                {/* <div className='media-right'>
                                    <img src={img} className='slider-img'></img>
                                </div> */}
                                {/* <div className='w-full md:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-4 p-4'>
                                    {[
                                        'vnexpress.png',
                                        'suckhoedoisong.png',
                                        'vtv1.png',
                                        'vtcnews.png',
                                        'vietnamnet.png',
                                        'dantri.png'
                                    ].map((logo, index) => (
                                        <div
                                            key={index}
                                            className='bg-white p-3 flex justify-center items-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'
                                        >
                                            <img src={`/images/${logo}`} alt={`logo-${index}`} className='h-12 object-contain' />
                                        </div>
                                    ))}
                                </div> */}

                                <div className='social-right'>

                                    <div className='media-left'>
                                        {[
                                            'vnexpress.png',
                                            'vtv1.png',
                                            'vnexpress.png',
                                            'vtv1.png',

                                        ].map((logo, index) => (
                                            <div
                                                key={index}
                                                className='each-social'
                                            >
                                                <img src={`/images/${logo}`} alt={`logo-${index}`} className='.slider-img' />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='media-right'>
                                        {[
                                            'vnexpress.png',
                                            'vtv1.png',
                                            'vnexpress.png',
                                            'vtv1.png',

                                        ].map((logo, index) => (
                                            <div
                                                key={index}
                                                className='each-social'
                                            >
                                                <img src={`/images/${logo}`} alt={`logo-${index}`} className='.slider-img' />
                                            </div>
                                        ))}
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(SocialMedia);
