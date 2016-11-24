import React, { Component } from 'react';

export function ObjectEach(obj, callback){
	let items = [];
	Object.keys( obj ).map((item)=>{
		items.push( callback( {title: item, studies: obj[item]['studies'] } ) );
	})
	return items;
}
