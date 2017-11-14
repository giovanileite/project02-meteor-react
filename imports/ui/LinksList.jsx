import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { Session } from 'meteor/session'
import FlipMove from 'react-flip-move'

import { Links } from '../api/links'
import LinksListItem from './LinksListItem'

export default class LinksList extends TrackerReact(React.Component) {
    constructor(props){
        super(props);
        const subscription = Meteor.subscribe('links.Pub');
        this.state = {
            ready: subscription.ready(),
            subscription: subscription
        }
    }
    componentWillUnmount() {
      this.state.subscription.stop();
    }
    links() {
        const linkS = Links.find({ visible: Session.get('showVisible') }).fetch();
        return linkS;
    }
    renderLinksListItems() {
        // Meteor.subscribe('links.Pub');
        if(this.links().length === 0) {
            return (
                <div className="item">
                    <p className="item__status-message">
                        No links found!
                    </p>
                </div>
            );
        }

        return this.links().map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
            // return <p key={link._id}>{link.url}</p>
        })
    }
    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        )
    }
}
