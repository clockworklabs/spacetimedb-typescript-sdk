export type PrereleaseId = string | number;

export type PreRelease = PrereleaseId[];


function comparePreReleases(
    a: PreRelease,
    b: PreRelease
): number {
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
        const aPart = a[i];
        const bPart = b[i];
        if (aPart === bPart) continue;
        if (typeof aPart === 'number' && typeof bPart === 'number') {
            return aPart - bPart;
        }
        if (typeof aPart === 'string' && typeof bPart === 'string') {
            return aPart.localeCompare(bPart);
        }
        // According to 11.4.3, numeric identifiers always have lower precedence than non-numeric identifiers.
        // So if `a` is a string, it has higher precedence than `b`.
        return typeof aPart === 'string' ? 1 : -1;
    }
    // See rule 11.4.4 in the semver spec.
    return a.length - b.length;
}

// We don't use these, so I'm not going to parse it to spec.
export type BuildInfo = string;

export class SemanticVersion {
    major: number;
    minor: number;
    patch: number;
    preRelease: PreRelease | null;
    buildInfo: BuildInfo | null;
    
    constructor(
        major: number,
        minor: number,
        patch: number,
        preRelease: PreRelease | null = null,
        buildInfo: BuildInfo | null = null
    ) {
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.preRelease = preRelease;
        this.buildInfo = buildInfo;
    }
    
    toString(): string {
        let versionString = `${this.major}.${this.minor}.${this.patch}`;
        if (this.preRelease) {
        versionString += `-${this.preRelease.join('.')}`;
        }
        if (this.buildInfo) {
        versionString += `+${this.buildInfo}`;
        }
        return versionString;
    }

    compare(other: SemanticVersion): number {
        if (this.major !== other.major) {
            return this.major - other.major;
        }
        if (this.minor !== other.minor) {
            return this.minor - other.minor;
        }
        if (this.patch !== other.patch) {
            return this.patch - other.patch;
        }
        if (this.preRelease && other.preRelease) {
            return comparePreReleases(this.preRelease, other.preRelease);
        }
        if (this.preRelease) {
            return -1; // The version without a pre-release is greater.
        }
        if (other.preRelease) {
            return -1; // Since we don't have a pre-release, this version is greater.
        }
        return 0; // versions are equal
    }

    static parseVersionString(version: string): SemanticVersion {
        const regex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([\da-zA-Z-]+(?:\.[\da-zA-Z-]+)*))?(?:\+([\da-zA-Z-]+(?:\.[\da-zA-Z-]+)*))?$/;
        const match = version.match(regex);
        if (!match) {
            throw new Error(`Invalid version string: ${version}`);
        }
        
        const major = parseInt(match[1], 10);
        const minor = parseInt(match[2], 10);
        const patch = parseInt(match[3], 10);
        const preRelease = match[4] ? match[4].split('.').map(id => isNaN(Number(id)) ? id : Number(id)) : null;
        const buildInfo = match[5] || null;
        
        return new SemanticVersion(major, minor, patch, preRelease, buildInfo);
    }
}

// The SDK depends on some module information that was not generated before this version.
export const MINIMUM_CLI_VERSION: SemanticVersion = new SemanticVersion(1, 1, 2);