import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import NumberFormat from 'react-number-format'
import { getAssetIcon } from '@components/icons/assets/tokens'

export function PoolPairDetails (props: { poolpair: PoolPairData }): JSX.Element {
  return (
    <div className='rounded-lg flex mt-4 flex-col p-6 bg-gray-50 w-full border border-gray-200' data-testid='PoolPairDetails'>
      <h1 className='text-sm font-medium' data-testid='title'>Tokens</h1>
      <div className='mt-5'>
        <div className='space-y-2.5' data-testid='PoolPairDetails.Price'>
          <span className='mb-1.5 text-sm text-gray-600'>Price</span>
          <TokenDetailsItem
            tokenSymbol={props.poolpair.tokenA.symbol}
            value={props.poolpair.priceRatio.ba}
            displaySymbol={`1 ${props.poolpair.tokenA.displaySymbol}`}
            suffix={props.poolpair.tokenB.displaySymbol}
            prefix='≈'
            testId='Price.TokenA'
          />
          <TokenDetailsItem
            tokenSymbol={props.poolpair.tokenB.symbol}
            value={props.poolpair.priceRatio.ab}
            displaySymbol={`1 ${props.poolpair.tokenB.displaySymbol}`}
            suffix={props.poolpair.tokenA.displaySymbol}
            prefix='≈'
            testId='Price.TokenB'
          />
        </div>
        <Divider />
        <div className='space-y-2.5 mt-7' data-testid='PoolPairDetails.Liquidity'>
          <TokenLiquidityItem title='Volume 24H' value={props.poolpair.volume?.h24} testId='24hVolume' />
          <TokenLiquidityItem title='Total Liquidity' value={props.poolpair.totalLiquidity.usd} testId='TVL' />
        </div>
        <Divider />
        <div className='space-y-2.5 mt-7' data-testid='PoolPairDetails.Pool'>
          <div className='mb-1.5 text-sm text-gray-600 flex justify-between'>
            <span>Pooled Tokens</span>
            <span>Amount</span>
          </div>
          <TokenDetailsItem
            tokenSymbol={props.poolpair.tokenA.symbol}
            value={props.poolpair.tokenA.reserve}
            displaySymbol={props.poolpair.tokenA.displaySymbol}
            testId='Pool.TokenA'
          />
          <TokenDetailsItem
            tokenSymbol={props.poolpair.tokenB.symbol}
            value={props.poolpair.tokenB.reserve}
            displaySymbol={props.poolpair.tokenB.displaySymbol}
            testId='Pool.TokenB'
          />
        </div>
        <Divider />
        <AprDetails apr={props.poolpair.apr} />
      </div>
    </div>
  )
}

function TokenDetailsItem (props: {
  tokenSymbol: string
  value: string
  displaySymbol: string
  prefix?: string
  suffix?: string
  testId: string
}): JSX.Element {
  const TokenIcon = getAssetIcon(props.tokenSymbol)
  return (
    <div className='flex items-center justify-between text-gray-900' data-testid={props.testId}>
      <span className='flex items-center'><TokenIcon className='mr-2 w-4 h-4' /> {props.displaySymbol}</span>
      <NumberFormat
        value={props.value}
        displayType='text'
        thousandSeparator
        suffix={props.suffix !== undefined ? ` ${props.suffix}` : undefined}
        prefix={props.prefix}
        className='font-medium'
        decimalScale={Number(props.value) > 1 ? 2 : 8}
        fixedDecimalScale
      />
    </div>
  )
}

function TokenLiquidityItem (props: { title: string, value: string | number | undefined, testId: string }): JSX.Element {
  return (
    <div className='flex items-center justify-between' data-testid={props.testId}>
      <span className='text-sm text-gray-500'>{props.title}</span>
      <NumberFormat
        value={props.value}
        prefix='$'
        thousandSeparator
        displayType='text'
        decimalScale={2}
        fixedDecimalScale
        className='font-medium text-gray-900'
      />
    </div>
  )
}

function AprDetails (props: {
  apr?: {
    total: number
    reward: number
    commission: number
  }}): JSX.Element {
  if (props.apr === undefined) {
    return <></>
  }
  return (
    <div className='space-y-2.5 my-5' data-testid='PoolPairDetails.Apr'>
      <div className='mb-1.5 flex items-center' data-testid='APR'>
        <span className='text-sm text-gray-600'>APR</span>
        <NumberFormat
          value={props.apr.total * 100}
          displayType='text'
          thousandSeparator
          decimalScale={2}
          fixedDecimalScale
          suffix='%'
          className='text-gray-900 font-medium ml-auto'
        />
      </div>
      <div className='flex items-center justify-between text-sm text-gray-500' data-testid='Rewards'>
        <span>Rewards</span>
        <NumberFormat
          value={props.apr.reward * 100}
          prefix='$'
          thousandSeparator
          displayType='text'
          decimalScale={2}
          fixedDecimalScale
          suffix='%'
        />
      </div>
      <div className='flex items-center justify-between text-sm text-gray-500' data-testid='Commissions'>
        <span>Commissions</span>
        <NumberFormat
          value={props.apr.commission * 100}
          prefix='$'
          thousandSeparator
          displayType='text'
          decimalScale={2}
          fixedDecimalScale
          suffix='%'
        />
      </div>
    </div>
  )
}

function Divider (): JSX.Element {
  return (
    <div className='border-b border-gray-200 mt-8' />
  )
}
