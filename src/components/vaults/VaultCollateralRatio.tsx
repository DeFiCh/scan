import { LoanScheme } from '@defichain/whale-api-client/dist/api/loan'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'

interface VaultCollateralRatioProps {
  collateralRatio: string
  loanScheme: LoanScheme
  className?: string
  testId?: string
}

export function VaultCollateralRatio (props: VaultCollateralRatioProps): JSX.Element {
  const minColRatio = new BigNumber(props.loanScheme.minColRatio)
  const collateralRatio = new BigNumber(props.collateralRatio)
  const currentPercentage = collateralRatio.div(minColRatio)

  return (
    <div
      className={
        classNames(props.className, {
          'text-red-500': currentPercentage <= new BigNumber(0.5),
          'text-orange-500': currentPercentage > new BigNumber(0.5) && currentPercentage <= new BigNumber(1.5),
          'text-green-500': currentPercentage > new BigNumber(1.5)
        })
      }
      data-testid={props.testId}
    >
      {`${props.collateralRatio}%`}
    </div>
  )
}