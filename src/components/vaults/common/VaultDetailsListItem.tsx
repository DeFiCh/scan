import React, { PropsWithChildren } from 'react'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import classnames from 'classnames'

interface VaultDetailsListItemProps {
  title: string
  infoDesc?: string
  testId?: string
  titleClassNames?: string
}

export function VaultDetailsListItem (props: PropsWithChildren<VaultDetailsListItemProps>): JSX.Element {
  return (
    <div className='flex justify-between text-gray-900' data-testid='VaultDetailList'>
      <div className='flex items-stretch' data-testid={props.testId}>
        <span className={classnames('text-gray-500', props.titleClassNames)}>{props.title}</span>
        {props.infoDesc !== undefined && (<InfoHoverPopover className='ml-1 self-center' description={props.infoDesc} placement='top' />)}
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
}
