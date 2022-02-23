import { Injectable, Logger } from '@nestjs/common';
import { KmsKeyringNode, buildClient, CommitmentPolicy } from '@aws-crypto/client-node'

const { encrypt, decrypt } = buildClient(
  CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT
);

@Injectable()
export class AppService {
  private static readonly LOGGER = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  // data 를 암호화 한다.
  async encryptData() {
    const generatorKeyId = 'arn:aws:kms:ap-northeast-2:1234567890:alias/my-kms-testing-alias';
    const keyIds = ['arn:aws:kms:ap-northeast-2:1234567890:key/1q2w3e4r-1q2w-3e4f-xxxx-1q2w3e4r5t6y'];
    const keyring = new KmsKeyringNode({generatorKeyId, keyIds});
    const grantTokens = [''];

    const context = {
      stage: 'demo',
      purpose: 'bigzero simple kms testing app',
      origin: 'ap-northeast-2',
    }

    const cleartext = 'iwanttoencryptit';

    const { result } = await encrypt(keyring, cleartext, {
      encryptionContext: context,
    });

    const { plaintext, messageHeader } = await decrypt(keyring, result);

    const { encryptionContext } = messageHeader;

    Object.entries(context).forEach(([key, value]) => {
      if (encryptionContext[key] !== value)
        throw new Error('Encryption Context does not match expected values')
    })

    Logger.debug('!!!!! PLANIN_TEXT !!!!! \n' + plaintext + '\n');
    Logger.debug('!!!!! RESULT !!!!! \n' + result + '\n');
    Logger.debug('!!!!! CLEAR_TEXT !!!!! \n' + cleartext + '\n');
    Logger.debug('!!!!! MESSAGE_HEADER !!!!! \n' + messageHeader + '\n');
  
    /* Return the values so the code can be tested. */
    return { plaintext, result, cleartext, messageHeader }

  }

}
