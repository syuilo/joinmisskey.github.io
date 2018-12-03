import { library, icon } from "@fortawesome/fontawesome-svg-core"

import {
    faTwitter,
    faGithub,
    faDiscord
} from '@fortawesome/free-brands-svg-icons'
library.add(
    faTwitter,
    faGithub,
    faDiscord
)

import {
    faLock,
    faLockOpen,
    faComments,
    faSearch,
    faShieldAlt,
    faCube,
    faBell,
    faEnvelopeSquare,
    faUsers,
    faPencilAlt,
    faICursor,
    faHdd,
    faUserCog,
    faFolderOpen,
    faTags,
    faClock,
    faBars,
    faHome,
    faBroadcastTower,
    faBook,
    faStoreAlt,
    faExternalLinkSquareAlt,
    faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons'
library.add(
    faLock,
    faLockOpen,
    faComments,
    faSearch,
    faShieldAlt,
    faCube,
    faBell,
    faEnvelopeSquare,
    faUsers,
    faPencilAlt,
    faICursor,
    faHdd,
    faUserCog,
    faFolderOpen,
    faTags,
    faClock,
    faBars,
    faHome,
    faBroadcastTower,
    faBook,
    faStoreAlt,
    faExternalLinkSquareAlt,
    faExternalLinkAlt
)

export const getHTML = (query, option) => {
    return icon(query, option).html[0]
}

export const getNode = (query, option) => {
    return icon(query, option).node
}

export const getIcon = (query, option) => {
    return icon(query, option)
}