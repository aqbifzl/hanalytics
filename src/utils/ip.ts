const IPV4_SIZE = 4
const IPV6_SIZE = 16

export const ipBufferToString = (ip: Buffer): string => {
  switch(ip.length){
    case IPV4_SIZE:
    return Array.from(ip).map(byte => byte.toString(10)).join('.')
    case IPV6_SIZE:
    return Array.from(ip).map((byte, i) => {
      let char = byte.toString(16).padStart(2, '0')
      if(i % 2 && i !== IPV6_SIZE-1){
        char += ':'
      }
      return char
    }).join("")
    default:
      throw new Error("Invalid ip in ipBufferToString")
  }
}

export const stringToIpBuffer = (ip: string): Buffer => {
  if(ip.includes('.')){ // IPV4
    const parts = ip.split('.').map(o => parseInt(o, 10))
    if(parts.length != IPV4_SIZE || parts.some(o => isNaN(o) || o < 0 || o > 255)){
      throw new Error("Invalid ip in stringToIpBuffer")
    }
    return Buffer.from(parts)
  }else{ //IPV6
    const parts = ip.split(':').flatMap(part => {
      const paddedPart = part.padStart(4, '0');
      return [parseInt(paddedPart.slice(0, 2), 16), parseInt(paddedPart.slice(2), 16)];
    });
    if (parts.length !== IPV6_SIZE || parts.some(part => isNaN(part) || part < 0 || part > 255)) {
      throw new Error("Invalid IPv6 address in ipStringToBuffer");
    }
    return Buffer.from(parts);
  }
}
