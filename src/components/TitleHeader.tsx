import React from 'react'

export default function TitleHeader({ name, owner }: { name: string, owner?: string }) {
    return (
        <span className="flex justify-between items-center gap-4 text-xl lg:text-2xl py-2">
            <h2 className="font-regular uppercase">{name}</h2>
            {owner && <span className="uppercase w-10 h-10 flex items-center justify-center rounded-full bg-theme/10">{owner.charAt(0).toUpperCase()}</span>}
        </span>
    )
}
