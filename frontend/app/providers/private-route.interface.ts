import { NextPage } from "next";

export type PrivatePageType = {
   isPrivatePage?: boolean
}

export type PrivateNextPage<T = {}> = NextPage<T> & PrivatePageType

export type TypeComponentAuthFields = {Component: PrivatePageType}