import { AssetService, Muta } from '../src';
import { Account } from '../src/account';

/**
 * finally, we learn higher APIs of AssetServiceTs.
 *
 * What's service in Muta-chain?
 * Service is a piece of code which provides you certain complete function. Services may
 * invoke each other to work together.
 * you can build your business logic and divided it into several part like micro-service
 * the whole chain is your business chain and services are your fundamental functions
 *
 * There are 2 kinds of services, one is built-in, another is user-defined
 *
 * use service APIs, you can never touch the details of Clients, just communicate data
 * with Service.
 * But for these Muta chain Service developers, you had better go back to previous examples,
 * so that you could build your own Service
 */
(async function AssetServiceExample() {
  /**
   * as usual, we get a Muta and Account object
   */

  const muta = Muta.createDefaultMutaInstance();
  const account = Account.fromPrivateKey(
    '0x1000000000000000000000000000000000000000000000000000000000000000',
  );

  /**
   * we build a service, pass the client and account object
   * nothing abnormal
   */
  const service = new AssetService(muta.client(), account);

  /**
   * let us create a new asset, like we did in ex4, you can see that's more frank.
   * no composing tx, no sending tx, no waiting to get the receipt, just get the Asset object
   */
  const createdAsset = await service.create_asset({
    name: 'LOVE_COIN',
    supply: 1314,
    symbol: 'LUV',
  });

  // keep the asset id for later use, you should keep it carefully
  const assetId = createdAsset.response.ret.id;

  // we send 520 LUVs to 0x2000000000000000000000000000000000000000
  const to = '0x2000000000000000000000000000000000000000';

  /**
   * just call transfer() function, you can 'transfer' coins in one function call
   *
   * the transfer() returns null,
   */
  await service.transfer({
    asset_id: assetId,
    to,
    value: 520,
  });

  /**
   * get the balance of balance0x2000000000000000000000000000000000000000
   */
  const {
    ret: { balance: balance0x2000000000000000000000000000000000000000 },
  } = await service.get_balance({
    asset_id: assetId,
    user: to,
  });

  /**
   * now you can sail by yourself, good trip
   */
})();
