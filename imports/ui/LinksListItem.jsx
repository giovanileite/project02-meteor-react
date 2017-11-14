import React, { Component } from 'react'
import Clipboard from 'clipboard'
import { Meteor } from 'meteor/meteor'
import moment from 'moment'

export default class LinksListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            justCopied: false
        }
    }
    componentDidMount(){
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success', () => {
            this.setState({ justCopied: true });
            setTimeout(() => this.setState({ justCopied: false }), 2000);
        }).on('error', () => {
            alert('Unable to copy. Please manually copy the link');
        })
    }
    componentWillUnmount(){
        this.clipboard.destroy();
    }
    renderStats() {
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let visitedMessage = null;
        if(typeof this.props.lastVisitedAt === 'number') {
            visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
        }
        return <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
    }
    render() {
        // condition ? true : false
        let justCopiedChanges = this.state.justCopied ? 'Copied' : 'Copy';
        return (
            <div className="item">
                <h2>
                    {this.props.url}
                </h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {/* <p>{this.props.visible.toString()}</p> */}
                { this.renderStats() }
                <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">Visit</a>
                <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>{justCopiedChanges}</button>
                <button className="button button--pill" onClick={() => { Meteor.call('links.setVisibility', this.props._id, !this.props.visible) }}>{this.props.visible ? 'Hide' : 'Unhide'}</button>
            </div>
        )
    }
}

