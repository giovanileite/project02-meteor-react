import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import Modal from 'react-modal'

export default class AddLink extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        }
    }
    
    onSubmit(e) {
        e.preventDefault();
        // const url = this.state.url;
        const { url } = this.state;

        Meteor.call('links.insert', url, (err, res) => {
            if(!err) {
                this.handleModalClose();
            } else {
                this.setState({ error: err.reason })
            }
        });
    }
    onChange(e) {
        this.setState({
            url: e.target.value
        })
    }
    handleModalClose() {
        this.setState({ 
            isOpen: false, 
            url: '', 
            error: '' 
        })
    }
    render() {
        return (
            <div>
                <button className="button" onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>
                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel="Add Link"
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.handleModalClose}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                    >
                    <h3>Add Link</h3>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit} className="boxed-view__form">
                        <input 
                            type="text" 
                            placeholder="URL"
                            ref="url"
                            value={this.state.url}
                            onChange={this.onChange}
                            />
                        <button className="button">Add link</button>
                        {/* Falando para o navegador que este botao nao eh para fazer submit */}
                        <button type="button" className="button button--secundary" onClick={ this.handleModalClose }>Close</button>
                    </form>
                </Modal>
            </div>
        )
    }
}
