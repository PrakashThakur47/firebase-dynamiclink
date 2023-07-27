import axios from 'axios';

export const generateShareLink = async (
  linkToEncode: string,
  socialTitle: string,
  socialDesc: string,
) => {
  const url = process.env.FIREBASE_DYNAMICLINK! + process.env.WEBAPIKEY!;
  const headers = { 'Content-Type': 'application/json' };
  const request = {
    dynamicLinkInfo: {
      domainUriPrefix: process.env.DOMAIN_URI_PREFIX!,
      link: linkToEncode,
      socialMetaTagInfo: {
        socialTitle: socialTitle ?? '',
        socialDescription: socialDesc ?? '',
      },
      androidInfo: {
        androidPackageName: process.env.ANDROID_BUNDLE!,
      },
      iosInfo: {
        iosBundleId: process.env.IOS_BUNDLE!,
        //   iosAppStoreId: `${this.configService.get('IOS_APPSTORE_ID')}`,
      },
    },
  };
  try {
    const response = await axios.post(url, request, { headers: headers });
    const result = response.status === 200 ? response.data : null;
    return {
      shortLink: result.shortLink,
    };
  } catch (e) {
    console.log(e);
  }
};
